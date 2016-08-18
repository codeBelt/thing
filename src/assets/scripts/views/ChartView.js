import DOMElement from 'structurejs/display/DOMElement';

/**
 * @class ChartView
 * @extends DOMElement
 * @constructor
 **/
class ChartView extends DOMElement {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/ChartView');

        const chartElement = this.$element.find('canvas').get(0);
        const chartCanvasContext = chartElement.getContext('2d');
        const chartData = {
            labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6', 'Data 7'],
            datasets: [{
                fillColor: 'rgba(220,220,220,0)',
                strokeColor: 'rgba(220,180,0,1)',
                pointColor: 'rgba(220,180,0,1)',
                data: [20, 30, 80, 20, 40, 10, 60]
            }, {
                fillColor: 'rgba(151,187,205,0)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                data: [60, 10, 40, 30, 80, 30, 20]
            }]
        };

        this._chart = new Chart(chartCanvasContext, {
            type: 'line',
            data: chartData,
            options: {
                // animation: false,
                // responsive: true,
                // maintainAspectRatio: false,
                // defaultFontSize: 12,
                // defaultFontFamily: 'Helvetica Neue',
                // defaultFontColor: 'rgb(26, 26, 26)',
                // legend: {
                //     display: false
                // },
                // tooltips: {
                //     enabled: false
                // }
            }
        });
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) {
            return;
        }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) {
            return;
        }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

}

export default ChartView;
