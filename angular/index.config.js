import { RoutesConfig } from './config/config.routes'
import { AuthConfig } from './config/config.auth'

angular.module('app.config')
    .config(RoutesConfig)
    .config(AuthConfig)