const express = require('express')
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js");


const app = express();

app.use(cors());
app.use(express.json());
// 'nv-MLsn5D&9xRt6'
const supabase = createClient('https://jujwyrwdxmyrtduncgxi.supabase.co', 'sb_publishable_GBEBSfxXE4h0yPsjIGvXmA__HK2sCCk')

app.get("/", async (req, res) => {
    return res.status(200).send("hola")

})
app.get("/aluno/:nome", async (req, res) => {
    const { nome } = req.params;
    const { data, error } = await supabase.from('alunos').select('*').eq("nome_aluno", nome);
    console.log(data)
    return res.status(200).json(data)

})
app.get("/aulas", async (req, res) => {

    const { data, error } = await supabase.from('aulas_exp').select('*');
    return res.status(200).json(data)
})

app.get("/especialista", async (req, res) => {

    const { data, error } = await supabase.from('especialistas').select('*');
    return res.status(200).json(data)
})

app.post("/login", async (req, res) => {
    const { nome } = req.body;


    const { data, error } = await supabase.from('alunos').select('*');
    console.log(data)
    if (data[0].nome_aluno == nome) {
        return res.status(200).json(data)
    } else {
        return res.status(200).json(null)
    }


})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})