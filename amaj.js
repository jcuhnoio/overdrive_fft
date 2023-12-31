import WaveSurfer from './wavesurfer.js/dist/wavesurfer.js'
import Spectrogram from './wavesurfer.js/dist/plugins/spectrogram.js'

function loadplayer(containerdiv, audiofile) {
    const wavesurfer = WaveSurfer.create({
        container: containerdiv,
        waveColor: '#4F4A85',
        progressColor: '#383351',
        url: audiofile,
        sampleRate: 48000,
    });

    wavesurfer.registerPlugin(
        Spectrogram.create({
            labels: true,
            height: 250,
            labelsColor: 'red',
        }),
    )

    wavesurfer.on('interaction', () => {
    wavesurfer.play()
    })
}

loadplayer('#Amaj_clean', './guitar_samples/Amaj_clean.wav');
loadplayer('#Amaj_analog_klon', './guitar_samples/Amaj_analog_klon.wav');
loadplayer('#Amaj_digital_klon', './guitar_samples/Amaj_digital_klon.wav');
loadplayer('#Amaj_analog_screamer', './guitar_samples/Amaj_analog_screamer.wav');
loadplayer('#Amaj_digital_screamer', './guitar_samples/Amaj_digital_screamer.wav');
loadplayer('#Amaj_analog_bigmuff', './guitar_samples/Amaj_analog_bigmuff.wav');
loadplayer('#Amaj_digital_bigmuff', './guitar_samples/Amaj_digital_bigmuff.wav');

