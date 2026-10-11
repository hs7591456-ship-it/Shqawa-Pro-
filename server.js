const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.static('public'));

const DATA_FILE = './projects.json';

// API يقرا المشاريع
app.get('/api/projects', (req,res)=>{
  if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE,'[]');
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// API يحفظ مشروع جديد
app.post('/api/projects', (req,res)=>{
  let projects = [];
  if(fs.existsSync(DATA_FILE)) projects = JSON.parse(fs.readFileSync(DATA_FILE));
  projects.unshift(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
  res.json({ok:true, message: 'اتحفظ يا شقاوة'});
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('SHQAWA PRO شغال على '+PORT));
