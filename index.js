import express from 'express';
const app = express();
import db from './repository/index.js';
const port = 3000;
app.use(express.json());

// agora sim
// C http://localhost:3000/api/v1/tarefa/cadastro -- abre um projeto anterior, ve tudo o que tem dentro dele
app.post('/api/v1/tarefa/cadastro', (req, res) => { // correto
    const { id, descricao, data, concluido } = req.body;
 
    if ( !id || !descricao || !data ){
        res.send({ message: "Cadastro não efetuado."})
        return
    }
    db.push({ id, descricao, data, concluido:false })
    res.send({ message: "Tarefa cadastrada com sucesso!"})
});
 
// R http://localhost:3000/api/v1/tarefa/pesquisar
app.get('/api/v1/tarefa/pesquisar/:id', (req, res) => { // correto
  const { id } = req.params;
  const tarefa = db.find(p => p.id == id);
 
  if (!tarefa) { // ahoba
    return res.send({ message: 'Tarefa não encontrada.' });
  }
 
  res.send(tarefa);
});

// R http://localhost:3000/api/v1/tarefa/:concluido
app.get('/api/v1/tarefa/:concluido', (req, res) => { // correto 
  const { concluido } = req.params;
  const tarefa = db.find(p => p.concluido == false);
 
  if (!tarefa) {
    return res.send({ message: 'Nenhuma tarefa não concluida encontrada.' });
  }
 
  res.send(tarefa);
});
   
// U http://localhost:3000/api/v1/tarefa/atualizar/1
app.put('/api/v1/tarefa/atualizar/:id', (req, res) => { // correto
    const  id  = req.params.id;
    const tarefa = db.find(p => p.id == id);
    const { descricao, data } = req.body;
 
    if (!tarefa) {
        return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
   
    if (!descricao && !data ){
        return res.status(400).send({ message: 'Insira algum dado para modificar!'});
    }
 
    tarefa.descricao = descricao;
    tarefa.data = data;
 
    res.send(tarefa);
});

// Update do true e false - http://localhost:3000/api/v1/tarefa/:id
app.put('/api/v1/tarefa/:id', (req, res) => {
    const  id  = req.params.id;
    const tarefa = db.find(p => p.id == id);
    // const concluido = db.findIndex(p => p.concluido == concluido);
 
    if (!tarefa) {
        return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
   
    tarefa.concluido =! tarefa.concluido;

    // if(concluido == true){
    //     concluido == false
    // }
 
    res.send(tarefa);
});
 
// Delete - http://localhost:3000/api/v1/tarefa/deletar
app.delete('/api/v1/tarefa/deletar/:id', (req, res) => { // correto
    const { id } = req.params;
    const index = db.findIndex(p => p.id == id);
 
    if (index === -1) {
        return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
 
    db.splice(index, 1);
 
    res.send({ message: 'Tarefa deletada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});