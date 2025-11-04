require 'sinatra'
require 'sinatra/cors'
require 'json'

# Configure Sinatra
set :port, 4567
set :bind, '0.0.0.0'
set :server, 'webrick'
set :public_folder, File.dirname(__FILE__) + '/../dist'

# Enable CORS
set :allow_origin, '*'
set :allow_methods, 'GET,HEAD,POST,PUT,DELETE,OPTIONS'
set :allow_headers, 'content-type,if-modified-since'

# Stats file path
STATS_FILE = File.join(File.dirname(__FILE__), 'game-stats.json')

# Initialize stats file if it doesn't exist
unless File.exist?(STATS_FILE)
  File.write(STATS_FILE, JSON.generate({
    handsPlayed: 0,
    gamesWon: 0,
    gamesLost: 0
  }))
end

# Helper method to read stats
def read_stats
  JSON.parse(File.read(STATS_FILE), symbolize_names: true)
rescue => e
  puts "Error reading stats: #{e.message}"
  { handsPlayed: 0, gamesWon: 0, gamesLost: 0 }
end

# Helper method to write stats
def write_stats(stats)
  File.write(STATS_FILE, JSON.pretty_generate(stats))
rescue => e
  puts "Error writing stats: #{e.message}"
end

# API Routes

# Get stats
get '/api/stats' do
  content_type :json
  read_stats.to_json
end

# Update stats
post '/api/stats' do
  content_type :json

  begin
    data = JSON.parse(request.body.read, symbolize_names: true)
    current_stats = read_stats
    updated_stats = current_stats.merge(data)
    write_stats(updated_stats)

    { success: true, stats: updated_stats }.to_json
  rescue => e
    status 500
    { success: false, error: e.message }.to_json
  end
end

# Reset stats
post '/api/stats/reset' do
  content_type :json

  begin
    default_stats = {
      handsPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    }
    write_stats(default_stats)

    { success: true, stats: default_stats }.to_json
  rescue => e
    status 500
    { success: false, error: e.message }.to_json
  end
end

# Health check
get '/health' do
  content_type :json
  { status: 'ok', timestamp: Time.now.to_i }.to_json
end

# Serve React app
get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

# Handle 404
not_found do
  if request.path.start_with?('/api')
    content_type :json
    { error: 'Not found' }.to_json
  else
    send_file File.join(settings.public_folder, 'index.html')
  end
end

# Start server message
puts <<~ASCII
╔════════════════════════════════════════╗
║      EUCHRE GAME RUBY SERVER           ║
╠════════════════════════════════════════╣
║  Server running at:                    ║
║  http://localhost:#{settings.port}             ║
║                                        ║
║  Press Ctrl+C to stop                  ║
╚════════════════════════════════════════╝
ASCII
