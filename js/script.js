const maxVagas=11;

function removerVaga(el){

    el.closest('.vaga-row').remove();

    document.getElementById('limite').innerText='';

    renderArte();
}

let ordemAZ=true;

function ordenarAZ(){

    const container =
        document.getElementById('vagas');

    const rows =
        [...container.querySelectorAll('.vaga-row')];

    rows.sort((a,b)=>{

        const ta =
            a.querySelector('.nome').value.toUpperCase();

        const tb =
            b.querySelector('.nome').value.toUpperCase();

        return ordemAZ
            ? ta.localeCompare(tb)
            : tb.localeCompare(ta);

    });

    container.innerHTML='';

    rows.forEach(r=>container.appendChild(r));

    ordemAZ=!ordemAZ;

    renderArte();
}

let ordemQtd=true;

function ordenarQtd(){

    const container =
        document.getElementById('vagas');

    const rows =
        [...container.querySelectorAll('.vaga-row')];

    rows.sort((a,b)=>{

        const qa =
            Number(a.querySelector('.qtd').value);

        const qb =
            Number(b.querySelector('.qtd').value);

        return ordemQtd
            ? qb-qa
            : qa-qb;

    });

    container.innerHTML='';

    rows.forEach(r=>container.appendChild(r));

    ordemQtd=!ordemQtd;

    renderArte();
}

function addVaga(){
 const cont=document.getElementById('vagas');
 if(cont.children.length>=maxVagas){
   document.getElementById('limite').innerText='Máximo de 11 vagas atingido.';
   return;
 }
 const row=document.createElement('div');
 row.className='vaga-row';
 row.innerHTML=`
<div class="drag">|||</div>

<input
class="nome"
type="text"
maxlength="32"
placeholder="Clique para inserir a vaga"
oninput="renderArte()">

<input
class="qtd"
type="number"
value="1"
min="1"
max="99"
oninput="renderArte()">

<div class="remover"
onclick="removerVaga(this)">
X
</div>
`;
 cont.appendChild(row);
 renderArte();
}


function formatarData(valor){
 if(!valor) return '';
 const d=new Date(valor+'T12:00:00');
 const meses=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
 return String(d.getDate()).padStart(2,'0')+' de '+meses[d.getMonth()]+' de '+d.getFullYear();
}

function renderArte(){
 const lista=document.getElementById('listaArte');
 lista.innerHTML='';
 const rows=[...document.querySelectorAll('.vaga-row')];
 let fs=20;

if(rows.length>=5) fs=18;

if(rows.length>=8) fs=16;

if(rows.length>=10) fs=15;

 lista.style.fontSize=fs+'px';

 rows.forEach(r=>{
   const nome=r.querySelector('.nome').value.trim();
   const qtd=r.querySelector('.qtd').value||1;
   if(nome){
      const div=document.createElement('div');
      div.className='item';
      div.innerHTML='<span class="bullet"></span><span>'+nome+' ('+qtd+')</span>';
      lista.appendChild(div);
   }
 });
 document.getElementById('dataArte').innerText=formatarData(document.getElementById('data').value);
}

async function exportar(){
 const canvas=await html2canvas(document.getElementById('arte'),{scale:2});
 const a=document.createElement('a');
 const d=new Date();
 const nome=`oportunidades_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}.png`;
 a.download=nome;
 a.href=canvas.toDataURL('image/png');
 a.click();
}

addVaga();
