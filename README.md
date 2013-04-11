#Simple Fullscreen Video Player

Dead simple, attractive HTML5 video player, designed to be easy to run locally. As I'm writing this to accomodate
a use case with Windows, for a user that is not necessarily a "power user", I selected PHP, because of its ubiquity,
and because XAMPP provides a solution that is "portable" (meaning that you can run it without have to install it, e.g.
from a thumb drive).

The main features of this are:

 - Plays videos in full screen mode (Requires a browser supporting the [HTML5 Full Screen API](http://www.sitepoint.com/html5-full-screen-api/))
 - It plays any videos found in the `/video` directory (provided they are supported by the browser—as of this writing, formats vary across the current modern browsers)
 - Once you select a video to play, it will continue to play all videos in the `/video` directory
 - the playlist of videos is updated in near-realtime by polling the `/video` directory

