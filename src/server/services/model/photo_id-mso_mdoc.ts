import {MsoMdoc} from "./mso-mdoc";

export const PHOTO_ID_MSO_MDOC: MsoMdoc = {
    name: 'Photo Identifier',
    doctype: 'org.iso.23220.2.photoid.1',
    namespace: 'org.iso.23220.photoid.1',
    attributes: [
        {value: 'issuing_authority', text: 'Issuing authority'},
        {value: 'issuing_country', text: 'Issuing country'},
        {value: 'given_name', text: 'Given name'},
        {value: 'issuance_date', text: 'Issuance date'},
        {value: 'birth_date', text: 'Birthdate'},
        {value: 'portrait', text: 'Portrait'},
        {value: 'family_name', text: 'Family name'},
        {value: 'expiry_date', text: 'Expiry date'},
    ]
}


