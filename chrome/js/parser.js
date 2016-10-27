function parseNama(s) {
	var nama = s.replace(/([\s\S]*)ang, (.*) \<inp.*([\s\S]*)/,"$2");
	nama = nama.replace(/ ([A-Z])\w+/g,' $1.');
	return nama;
}

function parsePengumumanSIM(s) {
	var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
	var noscript = div.innerHTML;
	noscript = noscript.replace(/\n.*<p class="sm"/g, '<p class="sm"');
	noscript = noscript.replace(/B\n.*<\/a/g, 'B</a');
	noscript = noscript.replace(/Ditambahkan oleh /g, '');
	noscript = noscript.replace(/<a href="#"(.*)<a href="(.*pdf)".*<\/a>/g, '<a href="http://sim.stts.edu/$2"$1');
	return noscript;
}

function parsePengumumanLab(s) {
	var html = document.createElement('html');
	html.innerHTML = s;
	var beritaLab = html.getElementsByClassName('main');
	var ganti = beritaLab[0].innerHTML;
	ganti = ganti.replace(/<br><br>/g, '<br />\n');
	ganti = ganti.replace(/<img class="new" src=".\/images\/icon-new.png">/g, '');
	ganti = ganti.replace(/<img src=".\/images\/banner.jpg"><br \/>/g, '');
	ganti = ganti.replace(/.*pagging([\s\S]*)/g, '');
	ganti = ganti.replace(/(.*an">)Ditambahkan Oleh (.*)<\/span>.*/g, '$1$2</span><br />');
	ganti = ganti.replace(/.*\n.*<a/, '<a');
	ganti = ganti.replace(/(<a.*)\n(.*)\n/g, '<div class="piece-left">$1$2</div>');
	return ganti;
}

function parseJadwalKul(s) {
	var html = s.replace(/,.*<\//g,'</');
	html = html.replace(/.*sec([\s\S]*)(Jadwal .*) (Sem.*\))([\s\S]*)<\/div>/, '<h3>$3</h3><h4>$2</h4>');
	html = $(html).find('th:first-child, td:first-child').remove().end();
	html = $(html).find('th:nth-child(2), td:nth-child(2)').remove().end();
	return html;
}

function parseJadwalUjian(s) {
	var html = s.replace(/,.*<\//g,'</');
	html = html.replace(/<br\/>/g, '');
	html = $(html).not(".section-name");
	html = $(html).find('th:first-child, td:first-child').remove().end();
	html = $(html).find('th:nth-child(2), td:nth-child(2)').remove().end();
	return html;
}

function parseJadwalPrakECC(s) {
	var html = s.replace(/<p.*(Jadwal .*) Sem.*\)/g, '<h4>$1</h4>');
	html = html.replace(/<br\/>/g, ' ');
	html = html.replace(/<br>/g, '');
	html = $(html).find('table:first-of-type th:first-child, table:first-of-type td:first-child').remove().end();
	return html;
}