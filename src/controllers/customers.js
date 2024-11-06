const CustomersModels = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

function index(req, res) {
    res.render('register', {
        title: defaultTitle
    })
}

async function add(req, res) {
    const {
        name,
        age,
        email,
        password,
    } = req.body

    const passwordCrypto = await crypto(password)

    const register = new CustomersModels({
        name,
        age,
        email,
        password: passwordCrypto,
    })

    register.save()
    res.render('register', {
        title: defaultTitle,
        message: 'cadastro realizado com sucesso'
    })
}


async function list(req, res) {
    const users = await CustomersModels.find()

    res.render('list', {
        title: 'Listagem de Usuários',
        users,
    })
}

async function formEdit(req, res) {
    const { id } = req.query

    const user = await CustomersModels.findById(id)

    res.render('edit', {
        title: 'Editar Usuário',
        user,
    })
}

async function edit(req, res) {
    const {
        name,
        age,
        email,
    } = req.body

    const { id } = req.params

    const user = await CustomersModels.findById(id)

    user.name = name
    user.age = age
    user.email = email

    user.save()

    res.render('edit', {
        title: 'Editar Usuário',
        user,
        message: 'Usuário alterado com sucesso'
    })
}

async function remove(req, res) {
    const { id } = req.params

    const remove = await CustomersModels.deleteOne({ _id: id })

    if (remove.deletedCount) {
        res.redirect('/list')
    }
}


module.exports = {
    index,
    add,
    list,
    formEdit,
    edit,
    remove,
}