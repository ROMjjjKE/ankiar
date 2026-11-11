
(function(){
  'use strict';
  var burger=document.getElementById('burger'), drawer=document.getElementById('drawer'),
      closeBtn=document.getElementById('drawerClose');
  function opens(){ return drawer && !drawer.hidden; }
  function openD(){ if(!drawer)return; drawer.hidden=false; document.body.classList.add('is-locked');
    if(burger) burger.setAttribute('aria-expanded','true');
    var f=drawer.querySelector('a,button'); if(f) f.focus(); }
  function closeD(){ if(!drawer)return; drawer.hidden=true; document.body.classList.remove('is-locked');
    if(burger){ burger.setAttribute('aria-expanded','false'); burger.focus(); } }
  if(burger) burger.addEventListener('click', openD);
  if(closeBtn) closeBtn.addEventListener('click', closeD);
  if(drawer) drawer.addEventListener('click', function(e){ if(e.target===drawer) closeD(); });
  document.addEventListener('keydown', function(e){
    if(!opens()) return;
    if(e.key==='Escape'){ closeD(); return; }
    if(e.key==='Tab'){
      var f=drawer.querySelectorAll('a,button'); if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
  drawer && Array.prototype.forEach.call(drawer.querySelectorAll('a'), function(a){ a.addEventListener('click', closeD); });
  window.addEventListener('resize', function(){ if(window.innerWidth>1080 && opens()) closeD(); });

  /* ---------- протокол осмотра ---------- */
  var pbtns = document.querySelectorAll('.prot__btn');
  Array.prototype.forEach.call(pbtns, function(b){
    b.addEventListener('click', function(){
      var body = b.nextElementSibling, open = b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded', open?'false':'true');
      b.querySelector('.prot__x').textContent = open ? '+' : '\u2013';
      if(body) body.hidden = open;
    });
  });

  /* ---------- маршрут ---------- */
  var stops = [["Бриф", "1 день", "Обсуждаем бюджет, марку, кузов, пробег и что для вас критично. Договариваемся, какую машину ищем и в каких странах смотрим."], ["Поиск и отбор", "2–7 дней", "Отбираем варианты в Германии и соседних странах, отсеиваем по истории и состоянию. Показываем вам 3–5 достойных, а не двадцать случайных."], ["Осмотр", "1 день", "Партнёр выезжает к продавцу: осмотр, толщиномер, диагностика, тест-драйв. Вы получаете протокол и фото с видео."], ["Торг и покупка", "1–2 дня", "Ведём переговоры с продавцом на немецком, согласуем цену и условия, организуем сделку."], ["Доставка", "3–7 дней", "Машина едет до границы или до Беларуси. Вы знаете, где она находится, на каждом этапе."], ["Документы", "1–2 дня", "Помогаем с оформлением документов на машину. Вопросы растаможки и постановки на учёт обсуждаем отдельно и заранее."]];
  var rpanel = document.getElementById('rpanel');
  var rbtns = document.querySelectorAll('.rstop');
  function renderRoute(i){
    if(!rpanel) return;
    var s = stops[i]; if(!s) return;
    rpanel.innerHTML = '<p class="eyebrow">Этап ' + (i+1) + ' из ' + stops.length + ' · ' + s[1] + '</p>' +
      '<h3>' + s[0] + '</h3><p style="color:#4A4F57;margin-top:8px">' + s[2] + '</p>';
    Array.prototype.forEach.call(rbtns, function(b, k){ b.setAttribute('aria-selected', k===i?'true':'false'); });
  }
  Array.prototype.forEach.call(rbtns, function(b, i){ b.addEventListener('click', function(){ renderRoute(i); }); });
  if(rpanel && rbtns.length) renderRoute(0);

  /* ---------- форма в WhatsApp ---------- */
  var form = document.getElementById('lead');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var d = new FormData(form), msg = document.getElementById('formMsg');
      var name=(d.get('name')||'').toString().trim(), phone=(d.get('phone')||'').toString().trim();
      if(!name || !phone){ if(msg){ msg.textContent='Напишите имя и телефон, чтобы мы могли ответить.'; } return; }
      var lines=['Заявка с сайта Анкиар','Имя: '+name,'Связь: '+phone];
      ['car','budget','msg'].forEach(function(k){ var v=(d.get(k)||'').toString().trim(); if(v) lines.push(({car:'Авто',budget:'Бюджет',msg:'Комментарий'})[k]+': '+v); });
      var url='https://wa.me/375336666206?text='+encodeURIComponent(lines.join('\n'));
      if(msg) msg.textContent='Открываем WhatsApp с готовым сообщением.';
      window.open(url,'_blank','noopener');
    });
  }
})();
