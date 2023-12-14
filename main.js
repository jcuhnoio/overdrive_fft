import WaveSurfer from 'wavesurfer.js'

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#4F4A85',
    progressColor: '#383351',
    url: '/QEA3_Final_Takes/QEA_A Major BIG MUFF.wav',
  });

wavesurfer.on('interaction', () => {
  wavesurfer.play()
  })