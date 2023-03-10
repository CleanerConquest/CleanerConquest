
import React from 'react'

export default class GlobalHeader extends React.PureComponent {
    render() {
        return (
            <div className="header">
                <label className="headerLabel">{this.props.value}</label>
                {
                    this.props.mode === "New" ?
                        <div className="modeHeader"><label>{this.props.newModeLabel}</label></div>
                        :
                        <div className="modeHeader"><label>{this.props.editModeLabel}</label></div>
                }
            </div>
        )
    }
}