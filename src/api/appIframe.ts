export const getIframe = () => {
    const frame = document.querySelector('iframe');
    frame && document.body.removeChild(frame);
}