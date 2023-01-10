const myOptions = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'shared-iterations', // линейная нагрузка
      vus: 10, // максимальное количество подключенных пользователй
      iterations: 200,// количество итераций теста iterations/vus
      maxDuration: '5m', // максимальная продолжительность теста
    },
  },
}

module.exports = myOptions