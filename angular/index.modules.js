angular.module('app', [
  'app.run',
  'app.services',
  'app.components',
  'app.routes',
  'app.config'
])

angular.module('app.run', [])
angular.module('app.routes', [])
angular.module('app.services', [])
angular.module('app.config', [])
angular.module('app.components', ['ui.router' , 'satellizer'
])
