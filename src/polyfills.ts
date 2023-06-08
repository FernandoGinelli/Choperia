/**
 * Este arquivo inclui polifills necessários pelo Angular e é carregado antes do aplicativo.
 * Você pode adicionar seus próprios polifills extras a este arquivo.
 *
 * Este arquivo é dividido em 2 seções:
 *   1. Polifills de navegadores. Estes são aplicados antes de carregar o ZoneJS e são definidos em ordem.
 *   2. Carga da aplicação. Polifills que são necessários para iniciar o aplicativo são carregados aqui.
 *
 * A configuração padrão é para polifills de navegadores e é criada quando você executa `ng new`.
 */

/***************************************************************************************************
 * POLIFILLS DE NAVEGADORES
 */

/** IE9, IE10 e IE11 requerem todas essas polifills. **/
import 'core-js/es/object';
import 'core-js/es/array';
import 'core-js/es/date';
import 'core-js/es/function';
import 'core-js/es/map';
import 'core-js/es/number';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/regexp';
import 'core-js/es/set';
import 'core-js/es/string';
import 'core-js/es/symbol';
import 'core-js/es/weak-map';

/** IE10 e IE11 requerem o seguinte para suporte à geração de números em um intervalo seguro. **/
import 'core-js/es/math';
import 'core-js/es/reflect';

/** Chrome, Firefox, e IE10+ requerem o seguinte para suporte à internacionalização. **/
import 'core-js/es/intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/pt';
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


/** Safari 10 requer o seguinte para suporte ao `@angular/animation`. **/
import 'web-animations-js';

/** Biblioteca adicional para suporte à `requestAnimationFrame`. **/
import 'zone.js/dist/zone-evergreen';

/***************************************************************************************************
 * CARGA DA APLICAÇÃO
 */

if (environment.production) {
  // Em produção, desabilitar a detecção de alterações em tempo real do Angular.
  enableProdMode();
}


module.exports = {
  // Other rules...
  plugins: [
      new NodePolyfillPlugin()
  ]
}
/**
 * Ao carregar a aplicação, informe ao Zone.js para aguardar a estabilização antes de carregar o aplicativo.
 * Isso permite que o servidor carregue primeiro, garantindo que a renderização seja correta.
 */
import './main';import { enableProdMode } from '@angular/core';
import { environment } from './environments/environments';

