function landMass(name, area) {
    //Implementación
    const tierra = 148940000;
    const percent = Number((Math.round(area * 10000 / tierra) / 100).toFixed(2));
    return {percent:percent, message: `${name} representa el ${percent}% de la masa de la tierra`};
}

module.exports = landMass;