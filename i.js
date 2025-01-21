let handler = async (m, { conn, args }) => {
  if (args.length === 2 && args[0] === 'all') {
    let users = global.db.data.users;
    let pointsToAdd = parseInt(args[1]);
    if (isNaN(pointsToAdd)) {
      return conn.reply(m.chat, '🚩 Jumlah peringatan yang dimasukkan harus berupa angka. Contoh: .addwarn all 1', m)
    }
    for (let user in users) {
      users[user].warn += pointsToAdd;
    }
    conn.reply(m.chat, `🚩${pointsToAdd} peringatan untuk semua pengguna.`, m);
  } else if (args.length === 2) {
    let mentionedJid = m.mentionedJid[0];
    if (!mentionedJid) {
      return conn.reply(m.chat,  '🚩 Tag pengguna yang ingin diberikan peringatan. Contoh: .addwarn @user 1', m)
    }
      
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})

    let pointsToAdd = parseInt(args[1]);
    if (isNaN(pointsToAdd)) {
      return conn.reply(m.chat, '🚩 Jumlah peringatan yang dimasukkan harus berupa angka. Contoh: .addwarn @user 1', m)
    }

    let users = global.db.data.users;
    if (!users[mentionedJid]) {
      users[mentionedJid] = {
        warn: 0,
      };
    }

    users[mentionedJid].warn += pointsToAdd;

    conn.reply(m.chat, `🚩 ${pointsToAdd} peringatan untuk @${mentionedJid.split('@')[0]}. untuk mengecek peringatan kamu ketik .cekwarn dan jika kamu mempunyai 5 peringatan maka kamu akan segera di ban oleh bot!`, m, {
      mentions: [mentionedJid]
    });
  } else {
    return conn.reply(m.chat,  '• *Example :* .addwarn @user 1 atau .addwarn all 1', m)
  }
};

handler.help = ['addwarn *@user*'];
handler.tags = ['owner'];
handler.command = /^addwarn$/i;
handler.mods = true;
handler.owner = true;
handler.group = true;

module.exports = handler;
