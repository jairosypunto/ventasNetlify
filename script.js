document.addEventListener("DOMContentLoaded", function () {
  // Productos disponibles
  const products = [
    {
      id: 1,
      name: "Disco Duro SSD 500GB",
      description:
        "Unidad de estado sólido de alta velocidad para mejorar el rendimiento de tu equipo.",
      price: 210000,
      image:
        "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Memoria RAM 8GB DDR4",
      description:
        "Módulo de memoria RAM para aumentar la capacidad de tu computadora.",
      price: 60000,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Tarjeta Gráfica GTX 1660",
      description:
        "Tarjeta gráfica para gaming y edición de video de alto rendimiento.",
      price: 195000,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Teclado Mecánico Gaming",
      description: "Teclado con switches mecánicos y retroiluminación RGB.",
      price: 210000,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      name: "Mouse Inalámbrico",
      description:
        "Mouse ergonómico con conexión inalámbrica y 6 botones programables.",
      price: 65000,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      name: 'Monitor 24" Full HD',
      description:
        "Monitor LED con resolución Full HD y tiempo de respuesta 1ms.",
      price: 604000,
      image:
        "https://images.unsplash.com/photo-1546538915-a9e2c8d8a7c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];

  // Servicios disponibles
  const services = [
    {
      id: 101,
      name: "Instalación de Hardware",
      description:
        "Instalación profesional de componentes de hardware en tu equipo.",
      price: 30000,
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 102,
      name: "Mantenimiento Preventivo",
      description:
        "Limpieza y mantenimiento para prolongar la vida útil de tus equipos.",
      price: 40000,
      image:
        "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 103,
      name: "Reparación de Computadoras",
      description:
        "Diagnóstico y reparación de problemas de hardware y software.",
      price: 70000,
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];

  // Variables del carrito
  let cart = [];
  const cartItems = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTax = document.getElementById("cart-tax");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const cartSidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("overlay");
  const productContainer = document.getElementById("product-container");
  const serviceContainer = document.getElementById("service-container");
  const checkoutBtn = document.getElementById("checkout-btn");
  const invoiceModal = document.getElementById("invoice-modal");
  const invoiceContent = document.getElementById("invoice-content");
  const closeModalBtn = document.getElementById("close-modal");
  const sendWhatsappBtn = document.getElementById("send-whatsapp");
  const sendEmailBtn = document.getElementById("send-email");
  const printInvoiceBtn = document.getElementById("print-invoice");

  // Mostrar productos
  function displayProducts() {
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                <div class="product-img" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="product-price">$${product.price}</span>
                    <button class="btn add-to-cart" data-id="${product.id}">Agregar al carrito</button>
                </div>
            `;
      productContainer.appendChild(productCard);
    });
  }

  // Mostrar servicios
  function displayServices() {
    serviceContainer.innerHTML = "";

    services.forEach((service) => {
      const serviceCard = document.createElement("div");
      serviceCard.className = "service-card";
      serviceCard.innerHTML = `
                <div class="service-img" style="background-image: url('${service.image}')"></div>
                <div class="service-info">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <span class="service-price">$${service.price}</span>
                    <button class="btn add-to-cart" data-id="${service.id}">Agregar al carrito</button>
                </div>
            `;
      serviceContainer.appendChild(serviceCard);
    });
  }

  // Manejar el carrito
  function addToCart(id) {
    // Buscar en productos
    let item = products.find((item) => item.id === id);

    // Si no está en productos, buscar en servicios
    if (!item) {
      item = services.find((item) => item.id === id);
    }

    if (!item) return;

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1,
      });
    }

    updateCart();
    showNotification("Producto agregado al carrito");
  }

  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
  }

  function updateCart() {
    // Actualizar items del carrito
    cartItems.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div class="cart-item-price">$${
                  item.price * item.quantity
                }</div>
                <button class="remove-item" data-id="${
                  item.id
                }">&times;</button>
            `;
      cartItems.appendChild(cartItem);
    });

    // Calcular totales
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.19; // IVA 19%
    const total = subtotal + tax;

    // Actualizar UI
    cartSubtotal.textContent = "$${subtotal.toFixed(2)}";
    cartTax.textContent = "$${tax.toFixed(2)}";
    cartTotal.textContent = "$${total.toFixed(2)}";
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Guardar en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCart();
    }
  }

  function clearCart() {
    cart = [];
    updateCart();
    localStorage.removeItem("cart");
  }

  // Generar factura
  function generateInvoice() {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.19;
    const total = subtotal + tax;
    const invoiceNumber = "FAC-" + Date.now().toString().slice(-6);
    const invoiceDate = new Date().toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let itemsHTML = "";
    cart.forEach((item) => {
      itemsHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
    });

    const invoiceHTML = `
            <div class="invoice">
                <div class="invoice-header">
                    <h2>JairoTech</h2>
                    <p>NIT: 123456789-0</p>
                    <p>Dirección: Calle 123 #45-67, Bogotá</p>
                    <p>Teléfono: 3016173378 | Email: jairosypunto@gmail.com</p>
                </div>
                
                <div class="invoice-info">
                    <div>
                        <p><strong>Factura No:</strong> ${invoiceNumber}</p>
                        <p><strong>Fecha:</strong> ${invoiceDate}</p>
                    </div>
                </div>
                
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
                
                <div class="invoice-totals">
                    <p><span>Subtotal:</span> <span>$${subtotal.toFixed(
                      2
                    )}</span></p>
                    <p><span>IVA (19%):</span> <span>$${tax.toFixed(
                      2
                    )}</span></p>
                    <p><span>Total a pagar:</span> <span>$${total.toFixed(
                      2
                    )}</span></p>
                </div>
                
                <div class="invoice-footer">
                    <p>¡Gracias por su compra!</p>
                    <p>Para garantías o soporte técnico, contactar al 3016173378</p>
                </div>
            </div>
        `;

    invoiceContent.innerHTML = invoiceHTML;
    return {
      invoiceNumber,
      invoiceDate,
      subtotal,
      tax,
      total,
      items: cart,
    };
  }

  // Mostrar notificación
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  // Manejar eventos
  function setupEventListeners() {
    // Abrir/cerrar carrito
    document.getElementById("cart-toggle").addEventListener("click", () => {
      cartSidebar.classList.add("active");
      overlay.classList.add("active");
    });

    document.getElementById("close-cart").addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      overlay.classList.remove("active");
      invoiceModal.classList.remove("active");
    });

    // Agregar al carrito
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        addToCart(id);
      }

      if (e.target.classList.contains("remove-item")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        removeFromCart(id);
      }
    });

    // Finalizar compra
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showNotification("El carrito está vacío");
        return;
      }

      generateInvoice();
      cartSidebar.classList.remove("active");
      invoiceModal.classList.add("active");
      overlay.classList.add("active");
    });

    // Cerrar modal de factura
    closeModalBtn.addEventListener("click", () => {
      invoiceModal.classList.remove("active");
      overlay.classList.remove("active");
    });

    // Enviar factura por WhatsApp
    sendWhatsappBtn.addEventListener("click", () => {
      const invoice = generateInvoice();
      let message = "*Factura ${invoice.invoiceNumber} - JairoTech*%0A%0A";
      message += "*Fecha:* ${invoice.invoiceDate}%0A%0A";
      message += "*Detalle de la compra:*%0A%0A";

      invoice.items.forEach((item) => {
        message +=
          -"${item.name} (${item.quantity} x $${item.price}) = $${(item.price * item.quantity).toFixed(2)}%0A";
      });

      message += "%0A*Subtotal:* $${invoice.subtotal.toFixed(2)}%0A";
      message += "*IVA (19%):* $${invoice.tax.toFixed(2)}%0A";
      message += "*Total:* $${invoice.total.toFixed(2)}%0A%0A";
      message +=
        "¡Gracias por su compra! Para garantías o soporte técnico, no dude en contactarnos.;";

      window.open("https://wa.me/573016173378?text=${message}", "_blank");
      clearCart();
      invoiceModal.classList.remove("active");
      overlay.classList.remove("active");
      showNotification("Factura enviada por WhatsApp");
    });

    // Enviar factura por email
    sendEmailBtn.addEventListener("click", () => {
      const invoice = generateInvoice();
      const subject = "Factura ${invoice.invoiceNumber} - JairoTech";
      let body = "Factura ${invoice.invoiceNumber}%0A%0A";
      body += "Fecha: ${invoice.invoiceDate}%0A%0A";
      body += "Detalle de la compra:%0A%0A";

      invoice.items.forEach((item) => {
        body +=
          "- ${item.name} (${item.quantity} x $${item.price}) = $${(item.price * item.quantity).toFixed(2)}%0A";
      });

      body += "%0ASubtotal: $${invoice.subtotal.toFixed(2)}%0A";
      body += "IVA (19%): $${invoice.tax.toFixed(2)}%0A";
      body += "Total: $${invoice.total.toFixed(2)}%0A%0A";
      body +=
        "¡Gracias por su compra! Para garantías o soporte técnico, no dude en contactarnos.;";

      window.open(
        "mailto:jairosypunto@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}"
      );
      clearCart();
      invoiceModal.classList.remove("active");
      overlay.classList.remove("active");
      showNotification("Factura enviada por correo");
    });

    // Imprimir factura
    printInvoiceBtn.addEventListener("click", () => {
      generateInvoice();
      window.print();
      clearCart();
      invoiceModal.classList.remove("active");
      overlay.classList.remove("active");
      showNotification("Factura impresa");
    });
  }

  // Inicializar
  displayProducts();
  displayServices();
  loadCart();
  setupEventListeners();
});
