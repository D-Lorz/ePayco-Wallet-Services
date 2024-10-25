class SoapClient {
    constructor (soapEndpoint) {
        this.soapEndpoint = soapEndpoint
    }

    async callSoapService (action, payload) {
        const xmlPayload = this.buildXmlPayload(action, payload)

        try {
            const response = await fetch(this.soapEndpoint, {
                body: xmlPayload,
                headers: {
                    'Content-Type': 'text/xml; charset=utf-8'
                },
                method: 'POST'
            })

            const textResponse = await response.text()
            return this.parseSoapResponse(textResponse)
        } catch (error) {
            console.error(`Error al comunicarse con el servicio SOAP para la acción ${action}:`, error)
            return {
                cod_error: '99',
                data: null,
                message_error: 'Error al comunicarse con el servicio SOAP.',
                success: false
            }
        }
    }

    buildXmlPayload (action, payload) {
        return `
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <${action}>
                        ${Object.entries(payload).map(([key, value]) => `<${key}>${value}</${key}>`).join('')}
                    </${action}>
                </soap:Body>
            </soap:Envelope>
        `
    }

    parseSoapResponse (response) {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response, 'text/xml')
        const success = xmlDoc.getElementsByTagName('success')[0]?.textContent === 'true'
        const codError = xmlDoc.getElementsByTagName('cod_error')[0]?.textContent || '99'
        const messageError = xmlDoc.getElementsByTagName('message_error')[0]?.textContent || 'Error desconocido'
        const data = xmlDoc.getElementsByTagName('data')[0]?.textContent

        return {
            cod_error: codError,
            data,
            message_error: messageError,
            success
        }
    }
}

export default SoapClient
