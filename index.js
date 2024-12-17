import{a as g,S as h,i as a}from"./assets/vendor-CSTHH2rc.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const y="47645607-ed5598dfc4be5ee4996d51637",p="https://pixabay.com/api/";async function v(t,r){return(await g.get(p,{params:{key:y,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data.hits}function L(){const t=document.getElementById("gallery");t.innerHTML=""}function b(t){const r=document.getElementById("gallery"),s=t.map(E).join("");r.insertAdjacentHTML("beforeend",s)}function E({likes:t,views:r,comments:s,downloads:o,webformatURL:e,largeImageURL:i}){return`
    <li class="gallery-item">
      <a href="${i}">
        <img src="${e}" alt="Image" class="gallery-image">
      </a>
      <div class="info-box">
        <div class="info-box-header">
          <div>Likes</div>
          <div>Views</div>
          <div>Comments</div>
          <div>Downloads</div>
        </div>
        <div class="info-box-values">
          <div>${t}</div>
          <div>${r}</div>
          <div>${s}</div>
          <div>${o}</div>
        </div>
      </div>
    </li>
  `}let I=new h(".gallery a");const w=document.getElementById("search-form"),n=document.getElementById("load-more"),f=document.getElementById("loading-message");let d="",c=1,m=0;w.addEventListener("submit",t=>{if(t.preventDefault(),d=t.target.elements.query.value.trim(),!d){a.error({message:"Please enter a search term."});return}B(),u()});n.addEventListener("click",()=>{c+=1,u(!0)});function B(){c=1,m=0,L(),n.classList.add("hidden")}async function u(t=!1){f.classList.remove("hidden");try{const r=await v(d,c);r.length===0&&!t?(a.warning({message:"No images found. Please try a different query."}),n.classList.add("hidden")):(b(r),I.refresh(),m+=r.length,r.length<15?(a.info({message:"You've reached the end of search results."}),n.classList.add("hidden")):n.classList.remove("hidden"),t&&P())}catch(r){console.error("Error fetching images:",r),a.error({message:"An error occurred while fetching images. Please try again later."})}finally{f.classList.add("hidden")}}function P(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
