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

        setTimeout(() => {
            this._buildChart();
        }, 0);
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

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * @method _buildChart
     * @protected
     */
    _buildChart() {

        const options = {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
        };

        const chartElement = this.$element.find('canvas').get(0);
        const chartCanvasContext = chartElement.getContext('2d');
        const chartData = {
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'],
            datasets: [
                Object.assign({}, options, {
                    label: 'Engineers',
                    data: [65, 59, 80, 81, 56, 55, 40, 23, 76],
                }),
                Object.assign({}, options, {
                    label: 'Executive',
                    data: [11, 22, 33, 44, 55, 66, 77, 11, 44],
                }),
                Object.assign({}, options, {
                    label: 'Analyst',
                    data: [22, 11, 66, 66, 66, 34, 88, 66, 11],
                })
            ]
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
}

export default ChartView;
