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

loadplayer('#G2_clean', './guitar_samples/G2_clean.wav');
loadplayer('#G2_analog_klon', './guitar_samples/G2_analog_klon.wav');
loadplayer('#G2_digital_klon', './guitar_samples/G2_digital_klon.wav');
loadplayer('#G2_analog_screamer', './guitar_samples/G2_analog_screamer.wav');
loadplayer('#G2_digital_screamer', './guitar_samples/G2_digital_screamer.wav');
loadplayer('#G2_analog_bigmuff', './guitar_samples/G2_analog_bigmuff.wav');
loadplayer('#G2_digital_bigmuff', './guitar_samples/G2_digital_bigmuff.wav');