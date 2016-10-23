export function runRoutes($rootScope, $state) {
    "ngInject";
    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if (false) {
            if (toState.name == 'app.login') return
            event.preventDefault()
            return $state.go('app.login')
        }
    })
}