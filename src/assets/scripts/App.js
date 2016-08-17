import DOMElement from 'structurejs/display/DOMElement';

import ModalManager from './controllers/ModalManager';
import IndexView from './views/IndexView';

/*

 ╔══════════════════════════════════════════════════════════════════════════════════════╗
 ║ Naming Convention                                                                    ║
 ╠══════════════════════════════════════════════════════════════════════════════════════╣
 ║ Anytime JavaScript interact with an element. Prepend the selector name with a 'js-'. ║
 ║ - Example: js-someButton                                                             ║
 ║                                                                                      ║
 ║ Name the selector the same name as the view.                                         ║
 ║ - Example: SomeView would have a selector named js-someView                          ║
 ╚══════════════════════════════════════════════════════════════════════════════════════╝

 ╔═══════════════════════════════════════════════════════════════════════════════════════════════╗
 ║ Architecture                                                                                  ║
 ╟───────────────────────────────────────────────────────────────────────────────────────────────╢
 ║ This application architecture is based on the Flux Architecture.                              ║
 ║ - https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture                  ║
 ║                                                                                               ║
 ║ This application uses the StructureJS library.                                                ║
 ║ - https://github.com/codeBelt/StructureJS                                                     ║
 ║ - http://codebelt.github.io/StructureJS/docs/                                                 ║
 ╚═══════════════════════════════════════════════════════════════════════════════════════════════╝

 http://lorefnon.me/plain-text-table/
 */

/**
 * @class App
 * @extends DOMElement
 * @constructor
 **/
class App extends DOMElement {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        ModalManager.setView(this);

        this.createComponents([
            {selector: '.js-IndexView', component: IndexView}
        ]);
    }

}

export default App;
