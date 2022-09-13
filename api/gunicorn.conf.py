wsgi_app = "wsgi:application"
workers = 5
max_requests = 5000
timeout = 1800
accesslog = "-"
errorlog = "-"
loglevel = "info"
worker_class = "gevent"
