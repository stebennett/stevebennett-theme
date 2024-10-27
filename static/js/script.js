document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.querySelector('.tabs');
    const tabs = document.querySelectorAll('.tab');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        
        // Hide all tab descriptions and remove active class from all tabs
        document.querySelectorAll('.tab-description').forEach(desc => {
          desc.style.display = 'none';
        });
        tabs.forEach(t => t.classList.remove('active'));
        
        // Show the selected tab description and add active class to the clicked tab
        document.getElementById(target).style.display = 'block';
        this.classList.add('active');
        
        // Scroll the clicked tab into view within the tabs container
        const tabRect = this.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const scrollLeft = tabRect.left - containerRect.left + tabsContainer.scrollLeft - (containerRect.width - tabRect.width) / 2;
        
        tabsContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      });
    });
  
    // Activate the first tab by default
    tabs[0].click();
  });

  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('Sending mail');

    

    try {
      const formData = new FormData(this);
      const data = Object.fromEntries(formData)

      console.log(data);

      const response = await fetch(CONFIG.submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-API-Key': CONFIG.apiKey,
        },
        body: JSON.stringify({ "data": data }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.log(error);
        throw new Error('Network response was not ok');
      }

      const submission = await response.json()

      alert('Message sent successfully');
      this.reset();

      console.log('Submitted data:', submission)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('There was a problem sending your message');
    }
  });