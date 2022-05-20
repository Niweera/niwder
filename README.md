[![action status badge](https://github.com/Niweera/niwder/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/Niweera/niwder/actions)
[![action status badge](https://github.com/Niweera/niwder/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Niweera/niwder/actions)

```
 __    __  __                      __                      __           
|  \  |  \|  \                    |  \                    |  \          
| $$\ | $$ \$$ __   __   __   ____| $$  ______    ______   \$$  ______  
| $$$\| $$|  \|  \ |  \ |  \ /      $$ /      \  /      \ |  \ /      \
| $$$$\ $$| $$| $$ | $$ | $$|  $$$$$$$|  $$$$$$\|  $$$$$$\| $$|  $$$$$$\
| $$\$$ $$| $$| $$ | $$ | $$| $$  | $$| $$    $$| $$   \$$| $$| $$  | $$
| $$ \$$$$| $$| $$_/ $$_/ $$| $$__| $$| $$$$$$$$| $$ __   | $$| $$__/ $$
| $$  \$$$| $$ \$$   $$   $$ \$$    $$ \$$     \| $$|  \  | $$ \$$    $$
 \$$   \$$ \$$  \$$$$$\$$$$   \$$$$$$$  \$$$$$$$ \$$ \$$   \$$  \$$$$$$
```

![image](src/helpers/cover_3.png)

# Niwder

Niwder (a combo of words, [NIWeera](https://github.com/Niweera), DownloadER) is a long time dream of mine (actually I
got this idea around 2017, thanks to [nisalb](https://github.com/nisalb)), and I tried to realize this dream for years
but to no avail until now.

Niwder is a system in three parts where,

1. [Niwder-API](https://github.com/Niweera/niwder-api) ([API Documentation](https://niwder-api.niweera.gq/api/docs))
2. [Niwder-Worker](https://github.com/Niweera/niwder-api/tree/main/src/worker)
3. [Niwder-UI](https://github.com/Niweera/niwder)

![image](src/helpers/system.jpg)

Currently, a user can add a [Mega.nz](https://mega.nz) file link, and get it converted to
a [Google Drive](https://drive.google.com) file link. Since handling a public faced Google Drive app authentication is a
big hassle (you need to get the Drive app verified), I have used a dummy Google Drive account for storing the
transferred Mega.nz file. In a future release, I will try to add a feature so that anyone can get their files straight
into their Google Drive.

When a user add a Mega.nz file, the [Niwder-API](https://github.com/Niweera/niwder-api) will queue the transfer job
using [Niwder-Worker](https://github.com/Niweera/niwder-api/tree/main/src/worker) and the Niwder-Worker will handle the
transfer job and transfer the Mega.nz file to a pre-determined Google Drive.
The [Google Drive SDK](https://developers.google.com/drive) will provide the pre-shared download link for the
transferred file, and it will be visible in the [Niwder-UI](https://github.com/Niweera/niwder).

Niwder-UI and Niwder-API use [Firebase](https://firebase.google.com/) for hosting and authentication.

![image](src/helpers/ui.jpg)

__🔥 Niwder.io uses [WebTorrent](https://github.com/webtorrent/webtorrent) for transferring torrents.__

__🍭 Niwder.io uses [FingerPrintJS](https://fingerprintjs.com) for anonymizing the user agents for storing Firebase
Cloud Messaging keys.__

![image](src/helpers/torrents-download-demo.gif)

New features to keep an eye on;

- [x] Google Drive link to Mega.nz link
- [x] Direct download link to Google Drive link
- [x] Direct download link to Mega.nz link
- [x] Google Drive link to direct download link
- [x] Mega.nz to direct download link
- [x] Torrents to Google Drive link
- [x] Torrents to Mega.nz link
- [x] Torrents to direct download link

Niwder is live on https://niwder.niweera.gq.
