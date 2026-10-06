// Real-Time eRTMAC Sensor Telemetry Engine & Anomaly Injector

export class TelemetryEngine {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.intervalId = null;
    this.isRunning = false;
    this.mode = 'NORMAL'; // NORMAL, STUCK_PIPE_ANOMALY, KICK_ANOMALY, MUD_LOSS_ANOMALY
    this.ticks = 0;

    // Base telemetry values for active well RDS-04 at 2518m in Barail
    this.state = {
      depth: 2518.4,
      bitDepth: 2517.2,
      rop: 14.8,            // m/hr
      wob: 18.5,            // klbf
      rpm: 120,             // RPM
      torque: 13200,        // ft-lbs
      hookload: 218.4,      // klbf
      standpipePressure: 2450, // psi
      flowRateIn: 680,      // gpm
      flowRateOut: 678,     // gpm
      mudWeightIn: 10.8,    // ppg
      mudWeightOut: 10.78,  // ppg
      ecd: 11.45,           // ppg
      pitVolume: 420.5,     // bbl
      pitGainLoss: 0.15,    // bbl/min
      gasReading: 0.8,      // % total gas
      gasTotal: 0.8,        // %
      gasConnection: 0.25,  // %
      mudTempIn: 38.5,      // °C
      mudTempOut: 51.2,     // °C
      blockPosition: 14.2,  // m
      blockSpeed: 0.18,     // m/s
      flowDiff: -0.3,       // %
      mode: 'NORMAL',
      timestamp: new Date().toLocaleTimeString()
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1500);
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.intervalId) clearInterval(this.intervalId);
  }

  setAnomalyMode(mode) {
    this.mode = mode;
  }

  tick() {
    this.ticks++;
    this.state.depth = parseFloat((this.state.depth + (this.state.rop / 3600) * 1.5).toFixed(2));
    this.state.bitDepth = parseFloat((this.state.depth - 1.2).toFixed(2));
    this.state.timestamp = new Date().toLocaleTimeString();

    const noise = (min, max) => min + Math.random() * (max - min);

    if (this.mode === 'NORMAL') {
      this.state.rop = parseFloat((14.5 + noise(-0.8, 0.8)).toFixed(1));
      this.state.wob = parseFloat((18.5 + noise(-0.6, 0.6)).toFixed(1));
      this.state.rpm = Math.round(120 + noise(-4, 4));
      this.state.torque = Math.round(13200 + noise(-300, 300));
      this.state.hookload = parseFloat((218.4 + noise(-2.0, 2.0)).toFixed(1));
      this.state.standpipePressure = Math.round(2450 + noise(-20, 20));
      this.state.flowRateIn = Math.round(680 + noise(-5, 5));
      this.state.flowRateOut = Math.round(this.state.flowRateIn + noise(-3, 1));
      this.state.ecd = parseFloat((this.state.mudWeightIn + (this.state.standpipePressure / 3000) * 0.85).toFixed(2));
      this.state.gasReading = parseFloat((0.8 + noise(-0.1, 0.15)).toFixed(2));
      this.state.gasTotal = this.state.gasReading;
      this.state.gasConnection = parseFloat((this.state.gasTotal * 0.3).toFixed(2));
      this.state.pitVolume = parseFloat((420.5 + noise(-0.2, 0.2)).toFixed(1));
      this.state.pitGainLoss = parseFloat(noise(-0.2, 0.2).toFixed(2));
      this.state.mudTempIn = parseFloat((38.5 + noise(-0.2, 0.2)).toFixed(1));
      this.state.mudTempOut = parseFloat((this.state.mudTempIn + 12.7 + noise(-0.3, 0.3)).toFixed(1));
      this.state.blockPosition = parseFloat((14.2 + noise(-0.5, 0.5)).toFixed(2));
      this.state.blockSpeed = parseFloat((0.18 + noise(-0.02, 0.02)).toFixed(2));
      this.state.flowDiff = parseFloat((((this.state.flowRateOut - this.state.flowRateIn) / this.state.flowRateIn) * 100).toFixed(1));
    } else if (this.mode === 'STUCK_PIPE_ANOMALY') {
      // Torque spikes, ROP drops, WOB rises, Hookload increases
      this.state.rop = parseFloat((Math.max(2.1, this.state.rop - 1.2)).toFixed(1));
      this.state.torque = Math.round(Math.min(22500, this.state.torque + 950));
      this.state.wob = parseFloat((Math.min(28.0, this.state.wob + 0.8)).toFixed(1));
      this.state.hookload = parseFloat((Math.min(275.0, this.state.hookload + 4.5)).toFixed(1));
      this.state.standpipePressure = Math.round(Math.min(3100, this.state.standpipePressure + 60));
    } else if (this.mode === 'KICK_ANOMALY') {
      // Flow out exceeds flow in, pit volume & pit gain rate increase, gas reading spikes, ECD drops
      this.state.flowRateOut = Math.round(this.state.flowRateIn + 65 + noise(10, 30));
      this.state.pitVolume = parseFloat((this.state.pitVolume + 1.2).toFixed(1));
      this.state.pitGainLoss = parseFloat((2.8 + noise(0.2, 0.8)).toFixed(2));
      this.state.gasReading = parseFloat((Math.min(12.5, this.state.gasReading + 1.4)).toFixed(2));
      this.state.gasTotal = this.state.gasReading;
      this.state.gasConnection = parseFloat((this.state.gasTotal * 0.45).toFixed(2));
      this.state.ecd = parseFloat((Math.max(9.8, this.state.ecd - 0.15)).toFixed(2));
      this.state.standpipePressure = Math.round(this.state.standpipePressure - noise(10, 30));
      this.state.flowDiff = parseFloat((((this.state.flowRateOut - this.state.flowRateIn) / this.state.flowRateIn) * 100).toFixed(1));
    } else if (this.mode === 'MUD_LOSS_ANOMALY') {
      // Flow out drops below flow in, pit volume decreases
      this.state.flowRateOut = Math.round(Math.max(420, this.state.flowRateOut - 25));
      this.state.pitVolume = parseFloat((Math.max(380.0, this.state.pitVolume - 1.8)).toFixed(1));
      this.state.pitGainLoss = parseFloat((-2.4 - noise(0.1, 0.5)).toFixed(2));
      this.state.standpipePressure = Math.round(Math.max(1950, this.state.standpipePressure - 35));
      this.state.flowDiff = parseFloat((((this.state.flowRateOut - this.state.flowRateIn) / this.state.flowRateIn) * 100).toFixed(1));
    }

    if (this.onUpdate) {
      this.onUpdate({ ...this.state, mode: this.mode });
    }
  }
}

export function calculateRiskScores(telemetry) {
  let stuckPipeRisk = 12;
  let kickRisk = 8;
  let mudLossRisk = 15;
  let pressureAnomalyRisk = 10;

  // Evaluation logic based on live sensor trends vs Barail baseline
  if (telemetry.torque > 16000 || (telemetry.rop < 6.0 && telemetry.torque > 15000)) {
    stuckPipeRisk = Math.min(96, Math.round(30 + (telemetry.torque - 15000) / 100));
  }

  if (telemetry.flowRateOut > telemetry.flowRateIn + 20 || telemetry.gasReading > 3.0) {
    kickRisk = Math.min(94, Math.round(40 + telemetry.gasReading * 6 + (telemetry.flowRateOut - telemetry.flowRateIn)));
  }

  if (telemetry.flowRateIn - telemetry.flowRateOut > 25 || telemetry.pitVolume < 415.0) {
    mudLossRisk = Math.min(92, Math.round(35 + (telemetry.flowRateIn - telemetry.flowRateOut) * 0.8));
  }

  if (telemetry.standpipePressure > 2800 || telemetry.standpipePressure < 2100) {
    pressureAnomalyRisk = Math.min(88, Math.round(25 + Math.abs(telemetry.standpipePressure - 2450) / 10));
  }

  const overallScore = Math.max(stuckPipeRisk, kickRisk, mudLossRisk, pressureAnomalyRisk);
  
  let primaryRisk = "Normal Operational Envelope";
  let recommendedAction = "Continue standard drilling parameters. Maintain KCL polymer mud weight at 10.8 ppg.";
  let confidence = 96;
  let nptSavingsEst = "0 hrs";

  if (stuckPipeRisk >= 75) {
    primaryRisk = "HIGH STUCK PIPE / DIFFERENTIAL STICKING RISK";
    recommendedAction = "1. Reduce ROP by 20%. 2. Pump 25 bbl spot of lubricant pill. 3. Increase rotary speed to 140 RPM and reciprocate drillstring.";
    confidence = 89;
    nptSavingsEst = "12 - 24 hrs NPT (Est. ₹18,000,000 saved)";
  } else if (kickRisk >= 70) {
    primaryRisk = "GAS KICK PREDICTED IN BARAIL SAND";
    recommendedAction = "1. Perform flow check immediately. 2. Space out and shut-in well if flow continues. 3. Prepare Barite to weight mud to 11.4 ppg via Driller's Method.";
    confidence = 92;
    nptSavingsEst = "18 - 36 hrs NPT (Est. ₹25,000,000 saved)";
  } else if (mudLossRisk >= 70) {
    primaryRisk = "SEVERE MUD LOSS INCIDENT IN PROGRESS";
    recommendedAction = "1. Reduce pump rate to 550 gpm. 2. Pump 30 bbl pre-mixed Fibrous LCM (Nutplug + Mica) pill. 3. Monitor annulus level continuously.";
    confidence = 91;
    nptSavingsEst = "8 - 14 hrs NPT (Est. ₹12,500,000 saved)";
  }

  return {
    stuckPipeRisk,
    kickRisk,
    mudLossRisk,
    pressureAnomalyRisk,
    overallScore,
    primaryRisk,
    recommendedAction,
    confidence,
    nptSavingsEst
  };
}
