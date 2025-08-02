const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)

// Customize the Metro bundler loading screen
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Override the default loading page
      if (req.url === "/" && req.method === "GET") {
        res.setHeader("Content-Type", "text/html")
        res.end(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Mantl - Loading</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background-color: #0f0f0f;
                  color: #4ecdc4;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                .logo {
                  font-size: 80px;
                  margin-bottom: 20px;
                }
                .title {
                  font-size: 48px;
                  font-weight: bold;
                  color: #4ecdc4;
                  margin-bottom: 8px;
                  letter-spacing: 4px;
                }
                .subtitle {
                  font-size: 16px;
                  color: #a0a0a0;
                  margin-bottom: 40px;
                }
                .loading {
                  width: 200px;
                  height: 4px;
                  background-color: #333;
                  border-radius: 2px;
                  overflow: hidden;
                  margin-bottom: 16px;
                }
                .loading-bar {
                  height: 100%;
                  background-color: #4ecdc4;
                  border-radius: 2px;
                  animation: loading 2s ease-in-out infinite;
                }
                .loading-text {
                  font-size: 14px;
                  color: #666;
                }
                @keyframes loading {
                  0% { width: 0%; }
                  50% { width: 70%; }
                  100% { width: 100%; }
                }
              </style>
            </head>
            <body>
              <div class="logo">💪</div>
              <div class="title">MANTL</div>
              <div class="subtitle">Mental Fitness for Men</div>
              <div class="loading">
                <div class="loading-bar"></div>
              </div>
              <div class="loading-text">Preparing your mental fitness journey...</div>
            </body>
          </html>
        `)
        return
      }
      return middleware(req, res, next)
    }
  },
}

module.exports = config
