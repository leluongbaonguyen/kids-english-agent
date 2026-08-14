module.exports = {
  apps: [{
    name: "web-api",
    script: "src/index.js",
    cwd: "/opt/webapp/server",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production",
      PORT: 3000,
      HOST: "0.0.0.0"
    },
    max_memory_restart: "700M",
    time: true,
    listen_timeout: 10000,
    kill_timeout: 5000,
    restart_delay: 2000,
    max_restarts: 10,
    autorestart: true
  }]
};
