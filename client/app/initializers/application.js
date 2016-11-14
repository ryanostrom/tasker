export function initialize(container, application) {
  application.inject('route', 'cookie', 'cookie:main');
  application.inject('controller', 'cookie', 'cookie:main');
  application.inject('component', 'cookie', 'cookie:main');
}

export default {
    name: 'application-initializer',
    after: ['cookie'],
    initialize: initialize
};
