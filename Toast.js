import React, {
    Component,
} from 'react';
import handler from './AppRegistryInjection'

import ToastView from './ToastView'

let view_id = 0;

class ToastUtil {

    static show = (message, options = {}) => {
        return handler.show(new Toast(message, options))
    }
}

class Toast {
    constructor(message, options) {
        this.message = message;
        this.options = options;
        this.component = <ToastView ref={(it)=>this.compRef=it} info={this} key={"toast-view-"+view_id++}
                                    onDismiss={this._onDismiss}/>;
    }

    _onDismiss = () => {
        if (this.dismissCallback) {
            this.dismissCallback()
        }
    };

    dismiss = () => {
        this.compRef.dismiss()
    }
}


export default ToastUtil