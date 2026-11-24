import ExpoModulesCore
import Foundation
import UIKit
import PDFKit
import Vision

public final class AthleteOcrModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AthleteOcr")
    AsyncFunction("read") { (uri: String, promise: Promise) in
      DispatchQueue.global(qos: .userInitiated).async {
        do {
          let url: URL
          if let parsed = URL(string: uri), parsed.isFileURL { url = parsed }
          else { url = URL(fileURLWithPath: uri) }
          let ext = url.pathExtension.lowercased()
          var lines: [String] = []
          if ext == "pdf" {
            guard let pdf = PDFDocument(url: url) else { throw NSError(domain: "AthleteOcr", code: 2, userInfo: [NSLocalizedDescriptionKey:"PDF kann nicht geöffnet werden."]) }
            for i in 0..<min(pdf.pageCount, 12) {
              guard let page = pdf.page(at: i) else { continue }
              let embedded = page.string?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
              if !embedded.isEmpty { lines.append(embedded) }
              else {
                let photo = page.thumbnail(of: CGSize(width: 1600, height: 2200), for: .mediaBox)
                lines.append(try Self.detectText(photo))
              }
            }
          } else if ["jpg", "jpeg", "png", "heic", "webp"].contains(ext) {
            guard let img = UIImage(contentsOfFile: url.path) else { throw NSError(domain: "AthleteOcr", code: 3, userInfo: [NSLocalizedDescriptionKey:"Bild konnte nicht geöffnet werden."]) }
            lines.append(try Self.detectText(img))
          } else { throw NSError(domain: "AthleteOcr", code: 4, userInfo: [NSLocalizedDescriptionKey:"Bitte PDF oder Bild auswählen."]) }
          promise.resolve(lines.joined(separator: "\n"))
        } catch { promise.reject("OCR_FAILED", error.localizedDescription) }
      }
    }
  }
  private static func detectText(_ image: UIImage) throws -> String {
    guard let cg = image.cgImage else { return "" }
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = false
    request.recognitionLanguages = ["de-DE", "en-US"]
    try VNImageRequestHandler(cgImage: cg).perform([request])
    let matches = request.results ?? []
    return matches.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
  }
}
