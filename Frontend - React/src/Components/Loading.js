import React from 'react'
import ReactLoading from 'react-loading'

export default class Loading extends React.PureComponent {
    render() {
        return (
            <div style={{ flex: 1, height: this.props.height || "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ReactLoading type={"spin"} color={"#3498ff"} height={'100px'} width={'100px'} />
            </div>
        )
    }
}