document.addEventListener('DOMContentLoaded', (event)=> {
  const boot = document.getElementById("boot")
  const color = document.getElementById("color")
  const swiss = document.getElementById("swiss")
  const progressive = document.getElementById("progressive")
  const preboot = document.getElementById("preboot")
  const network = document.getElementById("network")
  const ip = document.getElementById("ip")
  const ssid = document.getElementById("ssid")
  const password = document.getElementById("password")
  const config = document.getElementById("config")

  let config_data = {
    flippydrive: {
      boot_mode: "normal"
    },
    cubeboot: {
      cube_color: "660089",
      force_swiss_default: 0,
      force_progressive: 0,
      preboot_delay_ms: 0
    },
    network: {
      is_default: 0,
      server: "127.0.0.1",
      ssid: "WifiName",
      password: "WifiPSK"
    }
  };

  function buildData(data, element) {
    element.textContent = Object.entries(data).map(
      ([section, values], i) => `${i ? '\n' : ''}[${section}]\n` +
        Object.entries(values).map(([key, value]) => `${key} = ${value}`).join('\n')
    ).join('\n');
    delete element.dataset.highlighted;
    hljs.highlightElement(element);
  }

  buildData(config_data, config);

  function configListener(config, event, configEntry, configKey, target) {
    config.addEventListener(event, function() {
      configEntry[configKey] = config.value.replace('#','');
      buildData(config_data, target)
    })
  }

  configListener(boot, 'change', config_data.flippydrive, 'boot_mode', config);
  configListener(color, 'change', config_data.cubeboot, 'cube_color', config);
  configListener(swiss, 'change', config_data.cubeboot, 'force_swiss_default', config);
  configListener(progressive, 'change', config_data.cubeboot, 'force_progressive', config);
  configListener(preboot, 'change', config_data.cubeboot, 'preboot_delay_ms', config);
  configListener(network, 'change', config_data.network, 'is_default', config);
  configListener(ip, 'change', config_data.network, 'server', config);
  configListener(ssid, 'change', config_data.network, 'ssid', config);
  configListener(password, 'change', config_data.network, 'password', config);

  document.getElementById('download').addEventListener('click', (event)=> {
    let blob = new Blob([config.innerText], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'config.ini';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  })
});
