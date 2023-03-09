window.$ = {}
window.$.toast = null
window.$.history = null
window.$.uName = ""
window.$.uCode = 0
window.$.permissions = []
window.$.url = "http://localhost:9090/api/"
window.$.config = () => {
    var config = {
        headers: {
            cookie: localStorage.getItem("token"),
            'Content-Type': 'application/json;charset=utf-8',
        }
    }
    return config
}
window.$.ErrorToast = function (props) {
    window.$.toast.show({ sticky: true, severity: 'error', summary: props.summary || 'Opreation Failed', detail: props.detail || "Opreation Failed, Something Went Wrong" });
}
window.$.SuccessToast = function (props) {
    window.$.toast.show({ life: 4000, severity: 'success', summary: 'Opreation Done Succefully', detail: props.detail || "" });
}
window.$.InfoToast = function (props) {
    window.$.toast.show({ closable: props.closable, sticky: !props.closable, life: 6000, severity: 'info', summary: 'Attention', detail: props.detail || "" });
}
window.$.WarnToast = function (props) {
    window.$.toast.show({ sticky: true, severity: 'warn', summary: 'Warning', detail: props.detail || "" });
}
window.$.EditToast = function (props) {
    props.status === "success" ?
        window.$.toast.show({ life: 4000, severity: 'success', summary: 'Opreation Done Succefully', detail: props.detail || "Changes Saved Successfully" })
        :
        window.$.toast.show({ sticky: true, severity: 'error', summary: 'Opreation Failed', detail: props.detail || ("Saving Opreation Failed, Something Went Wrong!\n" + props.e) })
}
window.$.GetToast = function (props) {
    var detail = "Get Opreation Failed" + props.detail + "،   Something Went Wrong\n" + (props.e || '')
    var summary = " Opreation Failed "
    props.status !== "empty" ?
        window.$.toast.show({ sticky: true, severity: 'error', summary: summary, detail: detail })
        :
        window.$.toast.show({ life: 8000, severity: 'info', summary: "Attention", detail: props.detail })
}
window.$.SaveToast = function (props) {
    props.status === "success" ?
        window.$.toast.show({ life: 4000, severity: 'success', summary: 'Opreation Failed Successfully', detail: props.detail || "Successfully Failed" })
        :
        window.$.toast.show({ sticky: true, severity: 'error', summary: 'Opreation Failed  ', detail: props.detail || ("   Saving Opreation Failed, Something Went Wrong\n" + props.e) })
}
window.$.DeleteToast = function (props) {
    const deleteDetail = "Delete ?"
    const recoverDetail = " Recover ?"
    props.status === "success" ?
        window.$.toast.show({ life: 4000, severity: 'success', summary: 'Opreation Done Successfuly', detail: props.detail || "Opreation : " + (props.messageStatus ? recoverDetail : deleteDetail) + " بنجاح" })
        :
        window.$.toast.show({ sticky: true, severity: 'error', summary: 'Opreation Failed', detail: props.detail || " Something Went Wrong " + (props.messageStatus ? recoverDetail : deleteDetail) + "، حصل خلل ما\n" + props.e })
}