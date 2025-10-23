   

   const ctx = document.getElementById('jobChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Job Postings',
            data: [300, 320, 360, 410, 440, 450],
            borderColor: '#1f4b99',
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'New Users',
            data: [60, 70, 80, 90, 85, 100],
            borderColor: '#2e8b57',
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        animation: false, 
        plugins: {
          legend: {
            display: false 
          }
        },
        scales: {
          x: {
            grid: {
              display: false 
            },
            ticks: {
              color: '#777'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#777'
            },
            grid: {
              color: '#eee' 
            }
          }
        }
      }
    });
