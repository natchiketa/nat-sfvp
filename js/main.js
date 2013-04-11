var sfvpPlaylist, fileInfo, lastMD5;

function parseFileinfo(fileInfo) {
    var files = _.map(fileInfo, function(file) {
        return file.filename;
    });
    var playlist = _.map(fileInfo, function(f) {
        return {
            title: _.has(f.tags.quicktime, 'title') ? f.tags.quicktime.title[0] : f.filename,
            artist: _.has(f.tags.quicktime, 'artist') ? f.tags.quicktime.artist[0] : '',
            free: true,
            m4v: document.baseURI + 'video/' + f.filename
        }
    });
    return {
        files: files,
        playlist: playlist
    }
}

$(document).ready(function(){

    $.get('sfvp.php', {action: 'getid3'}, function(result) {
        fileInfo = parseFileinfo(result);

        sfvpPlaylist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, fileInfo.playlist, {
            playlistOptions: {
                autoPlay: true
            },
            swfPath: "vendor/js",
            supplied: "m4v",
            fullScreen: false
        });

        $.get('sfvp.php', {action: 'md5dir'}, function(result) {
            lastMD5 = result;
        });

        $(document).on('keyup', function(event) {
            var code = event.keyCode || event.which;
            if (code == 13) {
                event.preventDefault();
                console.log('caught enter key');
                $.get('sfvp.php', {action: 'md5dir'}, function(result) {
                    if (result != lastMD5) {
                        console.log('Video directory has changed. Updating...');
                        $.get('sfvp.php', {action: 'getid3'}, function(result) {
                            var newInfo = parseFileinfo(result);
                            _.each(newInfo.playlist, function(video, index) {
                                video.artist = '_' + video.artist;
                            });
                            sfvpPlaylist.setPlaylist(newInfo.playlist);
                            $.get('sfvp.php', {action: 'md5dir'}, function(result) {
                                lastMD5 = result;
                            });
                        });
                    } else {
                        console.log('No change in video directory contents');
                    }
                });
            }
        })


    });


});
