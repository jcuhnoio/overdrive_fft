function plotAudioFrequency(sample)
    % Read in the sound file
    [y, fs] = audioread(sample);

    % Take N-point FFT where N is the length of the signal
    ydft = fft(y);
    n = numel(y); % Get N - length of signal

    % Create frequency vector - make sure you remove last point
    freq = linspace(-fs/2, fs/2, n+1);
    freq(end) = [];

    % Shift the spectrum
    shiftSpectrum = fftshift(ydft);

    % Prepare the title with escaped underscores
    sampleTitle = strrep(sample, '_', '\_');

    % Plot magnitude in frequency domain
    figure; 
    plot(freq, abs(shiftSpectrum)); 
    title(sampleTitle)
    subtitle(['Magnitude over Frequency Domain']); 
    xlabel('Hz'); 
    ylabel('Magnitude'); 
    xlim([0, 5000])
    grid on;
    % Save the magnitude plot
    [~, name, ~] = fileparts(sample); % Extracts the file name without extension
    saveas(gcf, fullfile('img/magnitude_plots', ['magnitude_' name '.png']));

    % Plot phase in frequency domain
    figure; 
    plot(freq, unwrap(angle(shiftSpectrum))); 
    title(sampleTitle)
    subtitle(['Phase over Frequency Domain']); 
    xlabel('Hz'); 
    ylabel('Phase'); 
    grid on; 
    % Save the magnitude plot
    saveas(gcf, fullfile('img/phase_plots', ['phase_' name '.png']));
end