export function toast(str: string) {
    // TODO: style this
    alert(str);
}

export function unknownErrorToast() {
    toast('网络开小差了，请稍候重试');
}

