import{u as I,r,v as L,l as M,b as o,i as U,o as d,c as v,e,w as a,j as A,k as C,n as J,f as x,F as O,s as R,g as p,t as V,m as T,q as $}from"./index-6db92728.js";const G={class:"article"},K={key:0,style:{display:"flex","justify-content":"center",padding:"20px"}},X={__name:"Articles",setup(P){const z=I(),m=r([]),b=r([]),f=r(!1),w=r(1),u=r(10),_=r(0),n=L({keywords:"",category_id:""}),D=()=>{g(w.value,u.value)},N=i=>{localStorage.setItem("info",JSON.stringify(i));const{href:s}=z.resolve({path:"/articles-details"});window.open(s,"_blank")},S=i=>{g(i,u.value)};function g(i,s){f.value=!0;let y={page:i,size:s,keyword:n.keywords===""?void 0:n.keywords,category_id:n.category_id===""?void 0:n.category_id};x.get("/article_api/get",y).then(t=>{t!=null&&t.article_list?(m.value=(t==null?void 0:t.article_list)||[],_.value=(t==null?void 0:t.total)||0):(m.value=[],_.value=0),f.value=!1})}function Y(){x.get("/article_api/categories").then(i=>{console.log(i,"res"),b.value=i})}return M(()=>{Y(),g(w.value,u.value)}),(i,s)=>{const y=o("el-input"),t=o("el-form-item"),j=o("el-option"),q=o("el-select"),k=o("el-button"),B=o("el-form"),c=o("el-table-column"),h=o("el-tag"),E=o("el-table"),F=o("el-pagination"),H=U("loading");return d(),v("div",G,[e(B,{inline:!0,model:n,class:"demo-form-inline"},{default:a(()=>[e(t,{label:"关键字"},{default:a(()=>[e(y,{modelValue:n.keywords,"onUpdate:modelValue":s[0]||(s[0]=l=>n.keywords=l),placeholder:"关键字",clearable:""},null,8,["modelValue"])]),_:1}),e(t,{label:"文章分类"},{default:a(()=>[e(q,{modelValue:n.category_id,"onUpdate:modelValue":s[1]||(s[1]=l=>n.category_id=l),placeholder:"文章分类",clearable:""},{default:a(()=>[(d(!0),v(O,null,R(b.value,l=>(d(),C(j,{key:l.id,label:l.name,value:l.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(t,null,{default:a(()=>[e(k,{type:"primary",onClick:D},{default:a(()=>[p("查询")]),_:1})]),_:1})]),_:1},8,["model"]),A((d(),C(E,{data:m.value,style:{width:"100%"},size:"large"},{default:a(()=>[e(c,{type:"index",width:"50"}),e(c,{prop:"title",label:"标题"}),e(c,{prop:"keywords",label:"关键字"}),e(c,{prop:"category_name",label:"分类",width:"100"},{default:a(l=>[e(h,{class:"ml-2",type:"success"},{default:a(()=>[p(V(l.row.category_name),1)]),_:2},1024)]),_:1}),e(c,{prop:"create_time",label:"创建时间",width:"180"},{default:a(l=>[e(h,{class:"ml-2",type:""},{default:a(()=>[p(V(T($)(l.row.create_time).format("YYYY-MM-DD HH:mm:ss")),1)]),_:2},1024)]),_:1}),e(c,{fixed:"right",label:"",width:"80"},{default:a(l=>[e(k,{link:"",type:"primary",size:"large",onClick:Q=>N(l.row)},{default:a(()=>[p("详情")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[H,f.value]]),_.value>0?(d(),v("div",K,[e(F,{background:"",layout:"prev, pager, next",total:_.value,"page-size":u.value,onCurrentChange:S},null,8,["total","page-size"])])):J("",!0)])}}};export{X as default};
