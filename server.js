const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'projects.json');
if(!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]');

app.get('/api/projects', (req,res)=>{
  try{ res.json(JSON.parse(fs.readFileSync(dataPath,'utf8'))); }catch{ res.json([]); }
});

app.post('/api/projects', (req,res)=>{
  const projects = JSON.parse(fs.readFileSync(dataPath,'utf8'));
  projects.unshift(req.body);
  fs.writeFileSync(dataPath, JSON.stringify(projects,null,2));
  res.json({success:true});
});

app.delete('/api/projects/:date', (req,res)=>{
  let projects = JSON.parse(fs.readFileSync(dataPath,'utf8'));
  projects = projects.filter(p => String(p.date)!== String(req.params.date));
  fs.writeFileSync(dataPath, JSON.stringify(projects,null,2));
  res.json({success:true});
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('SHQAWA شغال'));
