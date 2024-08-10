# songs_data.py
from resource.song_lyrics_set.song1 import song1_lyrics
songs = {
    "set1": [            
        {
            'id': 'song1',
            'title': 'Dont look back in anger',
            'chords': ['C', 'G', 'A', 'E', 'F'],
            'sound' : 'https://ia800302.us.archive.org/15/items/OasisDontLookBackInAnger_201811/Oasis%20-%20Don%27t%20Look%20Back%20in%20Anger.mp3',
            'capo': 0,
            'artist': 'Oasis',
            'duration': '4:48',
            'difficult' : 'beginner',
            'genre': 'Rock',
            'image': "/static/images/song_banner/Dontlookbackinanger.gif",
            'default_speed': 1500,
            'chord_auto' :  song1_lyrics

        },
        {
            'id': 'song2',
            'title': 'Wonderwall',
            'chords': ['F', 'A', 'D', 'E'],
            'sound' : 'https://dn720302.ca.archive.org/0/items/cd_wonderwall_oasis/disc1/01.%20Oasis%20-%20Wonderwall_sample.mp3',
            'capo': 0,
            'artist': 'Oasis',
            'duration': '4:20',
            'difficult' : 'intermediate',
            'genre': 'Rock',
            'image': '/static/images/song_banner/Wonderwall_cover.jpg',


        },
        {
            'id': 'song3',
            'title': 'Yesterday',
            'artist': 'The Beatles',
            'sound' : 'https://ia804701.us.archive.org/27/items/TheBeatlesYesterdayLyrics123/The%20Beatles-Yesterday%20Lyrics.mp3',
            
            'chords': ['F', 'G', 'C', 'Am', 'Dm'],
            'capo': 0,
            'duration': '2:05',
            'difficult' : 'beginner',
            'genre': 'Rock',
            'image': '/static/images/song_banner/the-beatles-yesterday.jpg',

        },
        {
            'id': 'song4',
            'title': 'Mr. Brightside',
            'artist': 'The Killers',
            'duration': '3:42',
            'difficult' : 'intermediate',
            'genre': 'Rock',
            'image': '/static/images/song_banner/Brightside.webp'

        },
    ],
    "set2": [
        {
            'id': 'song5',
            'title': 'Love Story',
            'artist': 'Taylor Swift',
            'sound' : 'https://ia903102.us.archive.org/24/items/lovestory_381/03-taylor_swift-love_story_64kb.mp3',
            'chords': ['C', 'G', 'Am', 'F'],
            'capo': 2,
            'duration': '3:57',
            'difficult' : 'beginner',
            'genre': 'Pop',
            'image': '/static/images/song_banner/love_story.jpg',


        },
        {
            'id': 'song6',
            'title': 'There is a light that never goes out',
            'chords': ['C', 'G', 'Am', 'F'],
            'sound' : 'https://ia600504.us.archive.org/18/items/ThereIsALightThatNeverGoesOut/TheSmiths-ThereIsALightThatNeverGoesOut.mp3',
            'capo': 2,
            'artist': 'The Smiths',
            'duration': '4:03',
            'difficult' : 'intermediate',
            'genre': 'Rock',
            'image': '/static/images/song_banner/thesmith1.jpg',


        },
        {
            'id': 'song7',
            'title': 'Wake Me Up',
            'sound' : 'https://ezeventstorage.blob.core.windows.net/model-nsc/song1.mp3',
            'chords': ['Am', 'C', 'G', 'D'],
            'capo': 0,
            'artist': 'Avicii',
            'duration': '4:09',
            'difficult' : 'beginner',
            'genre': 'Pop',
            'image': '/static/images/song_banner/wakemeup.jpg'
        },
  
        {
            'id': 'song8',
            'title': 'Sugar',
            'artist': 'Maroon 5',
            'sound' : 'https://ezeventstorage.blob.core.windows.net/model-nsc/song1.mp3',
            'chords': ['C', 'G', 'Am', 'F'],
            'capo': 2,
            'duration': '3:55',
            'difficult' : 'intermediate',
            'genre': 'Pop',
            'image': '/static/images/song_banner/Sugar.jpg'
        },
  
    ],
    "set3": [
        {
            'id': 'song9',
            'title': 'Yellow',
            'artist': 'Coldplay',
            'chords': ['C', 'G', 'D', 'Cmaj7', 'Gsus4', 'Em7', 'Dm7'],
            'capo': 2,
            'sound' : 'https://ia600507.us.archive.org/30/items/4.11MBDownloadColdplayYellowMp3GratisStandMusic/%284.11%20MB%29%20Download%20Coldplay%20-%20Yellow%20Mp3%20Gratis%20-%20StandMusic.mp3',
            'duration': '4:29',
            'difficult' : 'beginner',
            'genre': 'Pop',
            'image': '/static/images/song_banner/yellow.gif'
        },
        {
            'id': 'song10',
            'title': 'Cruel Summer',
            'artist': 'Taylor Swift',
            'sound' : 'https://ia903108.us.archive.org/21/items/02cruelsummer/02%20Cruel%20Summer.mp3',
            'chords': ['G', 'D', 'Em', 'C','Bm'],
            'capo': 2,
            'duration': '3:57',
            'difficult' : 'intermediate',
            'genre': 'Pop',
            'image': '/static/images/song_banner/cruel.jpeg'

        },
        {
            'id': 'song11',
            'title': 'Radioactive',
            'artist': 'Imagine Dragons',
            'sound' : 'https://ia601302.us.archive.org/28/items/Radioactive_201601/Radioactive.mp3',
            'chords': ['Am', 'C', 'G', 'D'],
            'capo': 0,
            'duration': '3:07',
            'difficult' : 'beginner',
            'genre': 'Pop',
            'image': '/static/images/song_banner/radioactive.gif'
        },
        {
            'id': 'song12',
            'title': 'Hotel California',
            'artist': 'Eagles',
            'sound' : 'https://ezeventstorage.blob.core.windows.net/model-nsc/song1.mp3',
            'chords': ['Bm', 'F#', 'A', 'E', 'G', 'D', 'Em'],
            'capo': 2,
            'duration': '6:30',
            'difficult' : 'intermediate',
            'genre': 'Rock',
            'image': '/static/images/song_banner/hotel.png'
        },

    ],
    "set4": [
        
        {
            'id': 'song17',
            'title': 'คนมีเสน่ห์',
            'artist': 'ป้าง นครินทร์', 
            'chords': ['E', 'C', 'G', 'D'],
            'capo': 0,
            'sound' : 'https://ezeventstorage.blob.core.windows.net/model-nsc/song1.mp3',
            'duration': '3:36',
            'difficult' : 'beginner',
            'genre': 'Rock',
            'image': '/static/images/song_banner/pang.jpg'
        },
        
        {
            'id': 'song13',
            'title': 'Thunder',
            'artist': 'Imagine Dragons',
            'chords': ['Am', 'C', 'G', 'D'],
            'capo': 0,
            'sound' : 'https://ia601004.us.archive.org/19/items/imaginedragonsthunder/Imagine%20Dragons%20-%20Thunder.mp3',
            'duration': '3:07',
            'difficult' : 'intermediate',
            'genre': 'Pop',
            'image': '/static/images/song_banner/thunnder.jpg'

        },
        {
            'id': 'song14',
            'title': 'Stressed Out',
            'artist': 'Twenty One Pilots ',
            'chords': ['Am', 'C', 'G', 'D'],
            'capo': 0,
            'sound' : 'https://ia600403.us.archive.org/1/items/stressed-out_202204/Stressed%20Out.mp3',
            'duration': '3:22',
            'difficult' : 'beginner',
            'genre': 'Alternative',
            'image': '/static/images/song_banner/stressout.gif'
        },
        {
            'id': 'song15',
            'title': 'Run',
            'artist': 'LANY',
            'chords': ['Am', 'Fmaj7/A', 'G', 'D', 'C', 'F'],
            'capo': 0,
            'sound' : 'https://ezeventstorage.blob.core.windows.net/model-nsc/song1.mp3',
            'duration': '3:57',
            'difficult' : 'beginner',
            'genre': 'Pop',
            'image': '/static/images/song_banner/runn.jpg'
        },

        {
            'id': 'song16',
            'title': 'In the end',
            'artist': 'Linkin Park',
            'chords': ['Am', 'C', 'G', 'D'],
            'capo': 0,
            'sound' : 'https://ezeventstorage.blob.core.windows.net/model-nsc/song1.mp3',
            'duration': '3:36',
            'difficult' : 'intermediate',
            'genre': 'Rock',
            'image': '/static/images/song_banner/intheend.webp'
        },


    ]
}
