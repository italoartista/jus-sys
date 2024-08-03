const { v4: uuidv4 } = require('uuid');
const audiencias = [];

const createAudiencia = (req, res) => {
    const { data, hora, local, processo_id } = req.body;
    const id = uuidv4();
    const novaAudiencia = { id, data, hora, local, processo_id };
    audiencias.push(novaAudiencia);
    res.status(201).json(novaAudiencia);
};

const getAudienciaById = (req, res) => {
    const audiencia = audiencias.find(a => a.id === req.params.id);
    if (!audiencia) return res.status(404).json({ message: 'Audiência não encontrada' });
    res.json(audiencia);
};

const updateAudienciaById = (req, res) => {
    const index = audiencias.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Audiência não encontrada' });
    const { data, hora, local, processo_id } = req.body;
    audiencias[index] = { id: req.params.id, data, hora, local, processo_id };
    res.json(audiencias[index]);
};

const deleteAudienciaById = (req, res) => {
    const index = audiencias.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Audiência não encontrada' });
    audiencias.splice(index, 1);
    res.json({ message: 'Audiência excluída com sucesso' });
};

module.exports = { createAudiencia, getAudienciaById, updateAudienciaById, deleteAudienciaById };
