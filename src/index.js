import React, {Component} from 'react';


export default class smtReact extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.chart = null
    }

    componentDidMount() {
        let {actions, Bus} = this.props
        actions.onGlobalStateChange((newState, prev) => {
            this.renderView(newState)
        }, true)
    }

    getOption() {
        let {option, keys} = this.props
        let NewOption = {
            title: {
                text: keys
            },
            series: [{
                name: '农产品',
                type: 'pie',
                radius: '50%',
                data: option.data,
                itemStyle: {
                    color: "red"
                }
            }]
        }
        return NewOption
    }

    renderView(state) {
        let {Bus, actions, className = ".container"} = this.props
        let option = this.getOption();
        option = this.filterOption(option, state)
        let chartDom = document.querySelector(className);
        let myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }

    filterOption(option, state) {
        for (let key in state) {
            if (state[key].range.includes(this.props.keys)) {
                if (key === "system") {
                    //todo  option 覆盖
                    option.series[0].itemStyle = Object.assign({}, option.series[0].itemStyle, state[key].itemStyle)
                }
                let condition = state[key]["condition"]
                if (condition) {
                    let c = this.getFirstData(condition)
                    option.series[0].data =  option.series[0].data.filter(item => {
                        return item[c] == condition[c]
                    })
                }
            }
        }
        return option
    }

    getFirstData(data) {
        for (let key in data) {
            return key;
        }

    }

    render() {
        console.log(module,1234567);
        return (
            null
        )
    }


}