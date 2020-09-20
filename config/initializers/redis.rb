require 'redis-namespace'

redis = if Rails.env.test?
          MockRedis.new
        else
          Redis.new
        end

REDIS = Redis::Namespace.new('countries-app', redis: redis)
# REDIS = Redis::Namespace.new(:my_namespace, redis: Redis.new(host: Rails.application.config.redis_host, port: 6379, db: 0) )
