function validateClientFields(array, fields) {
    var validatedFields = [];
    console.log([array, fields]);
    const patternNomPrenom = /^[a-zA-Z]{3,15}$/,
        patternCin = /^[A-Z0-9]{8}$/,
        patternEmail = /^[a-zA-Z0-9-_.]+@[A-Za-z0-9]+[.]\w{2,5}$/,
        patternTelephone = /^(06|07)\d{8}$/,
        patternFax = /^05\d{8}$/,
        patternRS = /^[a-zA-Z0-9. ]{5,40}$/,
        patternFJ = /^[A-Z]{2,4}$/,
        patternAdresse = /^\d{1,5}\s[a-zA-Z0-9. ]{10,35}$/,
        patternId = /^[a-zA-Z0-9]{5,15}$/,
        patternPassword = /^[a-zA-Z0-9]{9,25}$/;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i].length <= 0)
            validatedFields.push(false);
        else {
            switch (fields[i].innerText) {
                case 'Nom Client :': validatedFields.push(regexValidation(array[i], patternNomPrenom)); break;
                case 'Prenom Client :': validatedFields.push(regexValidation(array[i], patternNomPrenom)); break;
                case 'Cin :':
                case 'Cin Client :': validatedFields.push(regexValidation(array[i], patternCin)); break;
                case 'EMail :':
                case 'EMail Client :': validatedFields.push(regexValidation(array[i], patternEmail)); break;
                case 'Telephone :':
                case 'Telephone Client :': validatedFields.push(regexValidation(array[i], patternTelephone)); break;
                case 'Fax :':
                case 'Fax Client :': validatedFields.push(regexValidation(array[i], patternFax)); break;
                case 'Raison Sociale :': validatedFields.push(regexValidation(array[i], patternRS)); break;
                case 'Forme Juridique :': validatedFields.push(regexValidation(array[i], patternFJ)); break;
                case 'Adresse :':
                case 'Adresse Client :': validatedFields.push(regexValidation(array[i], patternAdresse)); break;
                case 'Login :':
                case 'Identifiant Client :': validatedFields.push(regexValidation(array[i], patternId)); break;
                case 'Pass :':
                case 'Mot de pass Client :': validatedFields.push(regexValidation(array[i], patternPassword)); break;
            }
        }
    }
    return validatedFields;
    // console.log(validatedFields);
}
// 
function regexValidation(field, pattern) {
    return pattern.test(field);
}