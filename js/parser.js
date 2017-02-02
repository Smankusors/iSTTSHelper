function parseNama(s) {
	var nama = s.replace(/([\s\S]*)ang, (.*) \<inp.*([\s\S]*)/,"$2");
	return nama.replace(/ ([A-Z])\w+/g,' $1.');
}
function parsePengumumanSIM(s) {
	s = s.replace(/\/p>\r\n/g, '/p>').replace(/B\r\n.*<\/a/g, 'B</a');
	s = s.replace(/<a href="#"(.*)<a href="(.+?)".*<\/a>/g, '<a href="http://sim.stts.edu/$2"$1');
	return s.replace(/Ditambahkan oleh /g, '');
}
function parsePengumumanLab(s) {
	var lab = $('<div />').append(s);
	lab = $(lab).find('.main');
	lab = $(lab).find('img, #pagging, .pdf_file').remove().end();
	lab = $(lab).html();
	lab = lab.replace(/<br><br>/g, '').replace(/Ditambahkan Oleh /g, '').replace(/a><s/g, 'a><br /><s');
	lab = lab.replace(/&nbsp;&nbsp;/g, '\r\n').replace(/(<.+)/g, '<div class="piece-left">$1</div>');
	return lab.replace(/ref="ass/g, 'ref="http://lkomp.stts.edu/ass');
}
function parseJadwal(kul, ujian, ecc) {
	var result = $('<div />');
	kul = kul.replace(/,.*<\//g,'</').replace(/.*sec([\s\S]*)(Jadwal .*) (Sem.*\))([\s\S]*)<\/div>/, '<h3>$3</h3><hr /><h4>$2</h4>');
	kul = kul + "<br />";
	kul = $(kul).find('th:first-child, td:first-child').remove().end().find('th:nth-child(2), td:nth-child(2)').remove().end();
	ujian = ujian.replace(/,.*<\//g,'</').replace(/<br\/>/g, '').replace(/\t<h4>Jadwal UAS/, '<br /><h4>Jadwal UAS');
	ujian = ujian + "<br />";
	ujian = $(ujian).not(".section-name");
	ujian = $(ujian).find('th:first-child, td:first-child, th:nth-child(3), td:nth-child(3)').remove().end();
	ecc = ecc.replace(/<p.*(Jadwal .*) Sem.*\)/g, '<h4>$1</h4>').replace(/<br>/g, '');
	ecc = $('<div />').append(ecc);
	ecc = $(ecc).find("table:first th:first-child, table:first td:first-child").remove().end();
	result.append(kul); result.append(ujian); result.append(ecc);
	console.log(result.html());
	return result.html();
}