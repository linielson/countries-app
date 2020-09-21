require 'redis-namespace'

redis = if Rails.env.test?
          MockRedis.new
        else
          Redis.new
        end

REDIS = Redis::Namespace.new('countries-app', redis: redis)
